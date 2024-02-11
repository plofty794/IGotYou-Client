import{L as H,j as r,K as Q,u as w,k as e}from"./index-cef237f2.js";import{u as d,al as K,a6 as m,a7 as R,a2 as z,I as G,L as S,af as I,ag as M,ah as T,a8 as g,a9 as j,aa as v,am as O,an as V,B as f,ao as W,ap as J,aq as X,ar as Y,as as Z,at as ee,au as se,ab as y,S as ae,ad as te,Q as L,ac as ne}from"./App-46ffecf9.js";function re(){const{toast:t}=H(),{conversationID:l}=d(),{socket:i}=r.useContext(Q),u=w();return K({mutationFn:async({content:n,receiverName:c})=>await m.post(`/api/users/current-user/conversations/send-message/${l}`,{content:n,receiverName:c}),onSuccess(n){i==null||i.emit("chat-message",n.data),u.invalidateQueries({queryKey:["conversations"]}),u.invalidateQueries({queryKey:["conversation",l]})},onError(n){t({title:"Oops! Message not sent.",description:n.response.data.error,variant:"destructive"})}})}function ie(){const{conversationId:t}=d(),l=w();return K({mutationFn:async i=>await m.delete(`/api/users/current-user/conversations/delete/${i}`),onSuccess:()=>{l.removeQueries({queryKey:["conversation",t]})}})}function oe(){const{conversationID:t}=d();return R({queryKey:["conversation",t],queryFn:async()=>await m.get(`/api/users/current-user/conversations/${t}`),enabled:t!=null})}function ue(){var b,C,D,A,q,F;const{conversationID:t}=d(),l=z(),i=re(),{mutate:u}=ie(),n=w(),{socket:c}=r.useContext(Q),{data:s,isPending:k}=oe(),[_,P]=r.useState([]),[o,$]=r.useState([]),[x,N]=r.useState(""),[h,E]=r.useState();r.useEffect(()=>{var a;s!=null&&s.data.conversation.length&&((a=s==null?void 0:s.data.conversation)==null||a.map(p=>$(p.participants.filter(B=>B._id!==s.data.currentUserID)))),E(s==null?void 0:s.data.conversation),s==null||s.data.conversation.map(p=>P(p.messages))},[s==null?void 0:s.data.conversation,s==null?void 0:s.data.currentUserID]);async function U(a){await m.patch(`/api/users/current-user/conversations/read-message/${a}`,{read:!0}),n.invalidateQueries({queryKey:["conversations"]}),n.invalidateQueries({queryKey:["guest-notifications"]})}return r.useEffect(()=>{c==null||c.on("receive-message",()=>{n.invalidateQueries({queryKey:["conversation",t]}),n.invalidateQueries({queryKey:["conversations"]})})},[t,n,c]),e.jsx("div",{className:"px-8 py-6",children:k?e.jsx(G,{}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"mb-4 flex w-full items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(S,{to:`/users/visit/show/${(b=o[0])==null?void 0:b._id}`,children:e.jsxs(I,{children:[e.jsx(M,{className:"object-cover",src:(C=o[0])==null?void 0:C.photoUrl}),e.jsx(T,{children:"CN"})]})}),e.jsx("span",{className:"text-lg font-semibold",children:(D=o[0])==null?void 0:D.username})]}),e.jsx(g,{children:e.jsxs(j,{children:[e.jsx(v,{children:e.jsxs(O,{children:[e.jsx(V,{asChild:!0,children:e.jsx(f,{className:"p-2",variant:"destructive",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"white",className:"h-6 w-6",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"})})})}),e.jsxs(W,{children:[e.jsxs(J,{children:[e.jsx(X,{children:"Are you absolutely sure?"}),e.jsxs(Y,{className:"font-semibold text-gray-600",children:["This action cannot be undone. This will"," ",e.jsx("span",{className:"font-bold text-red-600 underline",children:"permanently delete"})," ","this conversation from our servers."]})]}),e.jsxs(Z,{children:[e.jsx(ee,{className:"rounded-full",children:"Cancel"}),e.jsx(se,{onClick:()=>{t&&u(t),setTimeout(()=>{l("/messages",{replace:!0}),document.location.reload()},600)},className:"rounded-full bg-gray-950",children:"Continue"})]})]})]})}),e.jsx(y,{children:e.jsx("p",{children:"Delete chat"})})]})})]}),e.jsx(ae,{}),e.jsxs(te,{className:"relative mt-2 h-[65vh] rounded-md border bg-[#F5F5F5] p-6",children:[e.jsxs("div",{className:"mx-auto flex w-max flex-col items-center justify-center gap-2",children:[e.jsx(S,{to:`/users/visit/show/${(A=o[0])==null?void 0:A._id}`,children:e.jsxs(I,{className:"h-24 w-24",children:[e.jsx(M,{className:"object-cover",src:(q=o[0])==null?void 0:q.photoUrl}),e.jsx(T,{children:"CN"})]})}),e.jsx("span",{className:"text-xl font-semibold",children:(F=o[0])==null?void 0:F.username}),e.jsx(f,{className:"rounded-full bg-zinc-900 text-xs",children:"View profile"})]}),e.jsx("div",{className:"mb-10 mt-4 flex h-max flex-col gap-2 p-4",children:_.map(a=>a.senderID._id===(s==null?void 0:s.data.currentUserID)?e.jsx(g,{children:e.jsxs(j,{children:[e.jsxs(v,{className:"ml-auto w-max rounded-full bg-gray-900 px-4 py-2",children:[" ",e.jsx("span",{className:"text-sm font-medium text-white",children:a.content},a._id)]}),e.jsx(y,{children:e.jsx("p",{children:L(new Date(a.createdAt),"p")})})]})}):e.jsx(g,{children:e.jsxs(j,{children:[e.jsxs(v,{className:"mr-auto w-max rounded-full bg-gray-700 px-4 py-2",children:[" ",e.jsx("span",{className:"text-sm font-medium text-white",children:a.content},a._id)]}),e.jsx(y,{children:e.jsx("p",{children:L(new Date(a.createdAt),"p")})})]})}))}),e.jsx("form",{onSubmit:a=>{a.preventDefault(),N(""),i.mutate({content:x,receiverName:o[0].username})},children:e.jsxs("div",{className:"absolute bottom-0 left-0 flex w-full items-center justify-between gap-2 bg-[#F5F5F5] p-2",children:[e.jsx(ne,{value:x,onChange:a=>N(a.target.value),placeholder:"Message...",onFocus:async()=>{var a;return h!=null&&!((a=h[0])!=null&&a.lastMessage.read)&&await U(h[0].lastMessage._id)},className:"w-full rounded-full bg-white p-5 font-medium",spellCheck:"true"}),e.jsx(f,{disabled:!x,className:"rounded-full bg-gray-950 p-6 text-lg",children:"Send"})]})})]})]})})}export{ue as default};