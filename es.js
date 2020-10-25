`use strict`
/**
 * - es version support
 * SimpleQ
 * version: 1.0.0
 * Developer: Eaglex ( http://eaglex.net ) 
 * License: CC BY-SA ( https://creativecommons.org/licenses/by/4.0/legalcode )
 * - Simple Promise defer
 */
export function sq(){return new function(){const e={};let t=null;const s=new Promise((t,s)=>{e.resolve=t,e.reject=s});this.resolve=((s=null)=>t?this:(e.resolve(s),t=!0,this)),this.reject=((s=null)=>t?this:(e.reject(s),t=!0,this)),this.promise=(()=>s)}}