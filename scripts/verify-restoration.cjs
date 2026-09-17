const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
const path = require('path');
(async () => {
 const base = process.env.SITE_URL || 'http://127.0.0.1:3186';
 const out = process.env.EVIDENCE_DIR || 'evidence/restoration'; fs.mkdirSync(out,{recursive:true});
 const browser = await chromium.launch({headless:true});
 const results=[];
 for (const width of [320,390,768,1440]) {
  const page = await browser.newPage({viewport:{width,height:900}});
  let issues=[];
  page.on('pageerror',e=>issues.push('page:'+e.message));
  page.on('console',m=>{if(m.type()==='error')issues.push('console:'+m.text());});
  page.on('response',r=>{if(r.status()>=400)issues.push('http:'+r.status()+':'+r.url());});
  for (const route of ['/','/solutions/','/professionals/','/about/','/contact/','/apply/','/privacy/']) {
   issues=[];
   const response=await page.goto(base+route,{waitUntil:'networkidle'});
   await page.evaluate(async()=>{await document.fonts.ready; for(const image of document.images)image.loading='eager'; await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
   const data=await page.evaluate(()=>({
    title:document.title,
    overflow:document.documentElement.scrollWidth>innerWidth,
    headerLogo:document.querySelector('header img')?.getAttribute('src'),
    headerBackground:getComputedStyle(document.querySelector('header')).backgroundColor,
    brokenImages:[...document.images].filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src),
    forms:document.querySelectorAll('form,input[type=file]').length,
    privateLinks:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')).filter(h=>/^\/(admin|worker|invite|api)(\/|$)/.test(h||'')||(/^mailto:/.test(h||'')&&h!=='mailto:info@simplemedicalstaffing.com')),
    // The one permitted email handler (RESTORATION.md): exactly one static contact link, only on /apply/.
    contactLinks:document.querySelectorAll('a[href="mailto:info@simplemedicalstaffing.com"]').length,
    canonical:document.querySelector('link[rel=canonical]')?.getAttribute('href'),
    radii:[...document.querySelectorAll('main .k-card,main .k-btn-primary,main img')].map(e=>getComputedStyle(e).borderRadius),
    unsafeCopy:/Staff sign-in \(demo\)|pending client confirmation|Demo note:|short application.*starts your file/i.test(document.body.innerText)
   }));
   if(width<1024){
    const toggle=page.getByRole('button',{name:'Open navigation'}); await toggle.click();
    if(await page.getByRole('button',{name:'Close navigation'}).getAttribute('aria-expanded')!=='true')issues.push('menu failed to open');
    await page.getByRole('button',{name:'Close navigation'}).click();
    if(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded')!=='false')issues.push('menu failed to close');
   }
   await page.keyboard.press('Tab');
   const focus=await page.evaluate(()=>{const r=document.activeElement.getBoundingClientRect();return {tag:document.activeElement.tagName,visible:r.width>0&&r.height>0&&r.left>=0&&r.right<=innerWidth};});
   if(!focus.visible)issues.push('keyboard focus outside viewport');
   await page.screenshot({path:path.join(out,`${route==='/'?'home':route.replaceAll('/','')}-${width}.png`),fullPage:true});
   const passed=response.status()===200&&!data.overflow&&!data.brokenImages.length&&!data.forms&&!data.privateLinks.length&&data.contactLinks===(route==='/apply/'?1:0)&&!data.unsafeCopy&&data.headerLogo==='/kindred/logos/kindred-mark.svg'&&data.canonical==='https://simplemedicalstaffing.com'+route&&!issues.length;
   results.push({route,width,status:response.status(),...data,focus,issues:[...issues],passed});
  }
  await page.close();
 }
 await browser.close();
 fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
 const summary={base,total:results.length,passed:results.filter(x=>x.passed).length,failed:results.filter(x=>!x.passed)};
 console.log(JSON.stringify(summary,null,2));
 if(summary.failed.length)process.exitCode=1;
})();
