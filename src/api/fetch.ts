
export const fetchsubmit = (form:any)=>{return fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }).catch(() => {}); } 
export default fetchsubmit