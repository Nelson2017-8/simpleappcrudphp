import{_,d as D,r as m,b as d,o,e as l,f as e,w as v,v as U,g as h,F as $,h as w,t as n,i as c,a as p}from"./app-0ad7e24e.js";const k=D({data(){return{listUsers:null,path:location.origin,email:"",alert:{timestamp:"",body:"",title:""},id:null,modal:{title:"",body:""},emptyData:!0}},setup(){const t=m(),s=m();return{toastRef:t,modalRef:s}},methods:{async search(){if(this.listUsers=null,this.email===""||this.email.length<3){this.loadData();return}d.post(`${this.path}/user/find`,{email:this.email}).then(t=>{const s=t.data;s.listUsers===null?(this.alert.body="No hay registros asociado al correo "+this.email,this.alert.timestamp="hace 1 seg",this.alert.title="Lo siento mucho",this.toastRef.show(),this.emptyData=!0):(this.listUsers=[s.user],this.listUsers.length===0&&(this.emptyData=!0))})},formatDate(t){let s=new Date(t),u=s.getFullYear(),i=s.getDate()+1;i<10&&(i="0"+i);let r=s.getMonth()+1;return r<10&&(r="0"+r),`${i}/${r}/${u}`},async loadData(){this.emptyData=!1,await d.post(`${this.path}/user/query`).then(t=>{const s=t.data;if(s.resul===!1){this.alert.body="No hay usuarios registrados en la base de Datos",this.alert.timestamp="hace 1 seg",this.alert.title="Lo siento mucho",this.toastRef.show();return}if(s.users!==void 0){this.users=s.users,this.listUsers=s.users,this.users.length===0&&(this.emptyData=!0);return}this.emptyData=!0})},async confirmDeleteUser(){d.post(`${this.path}/user/delete`,{id:this.id}).then(t=>{if(t.data.result===!0){this.alert.body="Usuario eliminado",this.alert.timestamp="hace 1 seg",this.alert.title="Operación exitosa",this.toastRef.show(),this.id=null,this.loadData();return}this.alert.body="El Usuario no se pudo eliminar",this.alert.timestamp="hace 1 seg",this.alert.title="Ha ocurrido un error inesperado",this.toastRef.show(),this.id=null})},deleteUser(t,s){this.modal.title="Eliminar usuario",this.modal.body=`¿Esta seguro que desea eliminar el usuario <strong>${s}</strong>?`,this.modalRef.show(),this.id=t},updateUser(t){localStorage.setItem("user",JSON.stringify(t)),this.$router.push("update_user")}},mounted(){this.loadData()}}),C={class:"container"},N={class:"row justify-content-md-center my-5"},R={class:"col-12"},E=e("h1",{class:"text-info text-center mb-5"},"Buscar usuario",-1),M={class:"input-group mb-3"},B={key:0,class:"col-12"},F=e("div",{class:"alert alert-danger",role:"alert"}," No hay usuarios registrado en el sistema ",-1),S=[F],V={key:0,class:"row justify-content-md-center mb-5"},z={key:0,class:"col-12"},I={class:"table table-bordered table-borderless table-hover"},L=e("thead",null,[e("tr",null,[e("th",null,"#"),e("th",null,"Foto"),e("th",null,"Nombre Completo"),e("th",null,"Correo Electrónico"),e("th",null,"Fecha de Nacimiento"),e("th")])],-1),T=["src","alt"],j={class:"btn-group btn-group-sm"},q=["onClick"],O=["onClick"];function A(t,s,u,i,r,H){const b=p("Toast"),y=p("Modal");return o(),l("div",C,[e("div",N,[e("div",R,[E,e("div",M,[v(e("input",{type:"search",class:"form-control","onUpdate:modelValue":s[0]||(s[0]=a=>t.email=a),placeholder:"Introduzca el correo del usuario","aria-label":"Introduzca el correo del usuario","aria-describedby":"search-button"},null,512),[[U,t.email]]),e("button",{class:"btn btn-primary",type:"button",id:"search-button",onClick:s[1]||(s[1]=(...a)=>t.search&&t.search(...a))},"Buscar")])]),t.emptyData===!0?(o(),l("div",B,S)):h("",!0)]),t.emptyData===!1?(o(),l("div",V,[t.listUsers!==null?(o(),l("div",z,[e("table",I,[L,e("tbody",null,[(o(!0),l($,null,w(t.listUsers,(a,f)=>(o(),l("tr",{key:a.id},[e("td",null,n(++f),1),e("td",null,[e("img",{src:a.photo_profile,alt:a.email,width:"50"},null,8,T)]),e("td",null,n(a.first_name)+" "+n(a.last_name),1),e("td",null,n(a.email),1),e("td",null,n(t.formatDate(a.birthdate)),1),e("th",null,[e("div",j,[e("button",{type:"button",onClick:g=>t.updateUser(a),class:"btn btn-secondary"},"Actualizar",8,q),e("button",{type:"button",onClick:g=>t.deleteUser(a.id,a.email),class:"btn btn-danger"},"Eliminar",8,O)])])]))),128))])])])):h("",!0)])):h("",!0),c(b,{ref:"toastRef",title:t.alert.title,body:t.alert.body,timestamp:t.alert.timestramp},null,8,["title","body","timestamp"]),c(y,{ref:"modalRef",title:t.modal.title,body:t.modal.body,onModalSave:t.confirmDeleteUser},null,8,["title","body","onModalSave"])])}const Q=_(k,[["render",A]]);export{Q as default};
