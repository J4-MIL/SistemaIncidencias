import {
 getSession, redirectByRole 
}
 from './utils/session.js';
 const u=getSession();
 location.href=u?redirectByRole(u):'login.html';

