import { redirect } from "react-router-dom";
import localforage from "localforage";


interface eventProps {
    id: string,
    avatar: string,
    name:string,
    url:string,
    description:string,
    feedback: string,
} 

export async function deleteAction({request, params}: any) {
    console.log(request);
    let events = await localforage.getItem("events") as eventProps[]; 
    events = events.filter((event) => event.id !== params.contactId) ;
    await localforage.setItem("events", events);
    return redirect("/");
};