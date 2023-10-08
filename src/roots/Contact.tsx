import {useLoaderData, useNavigate, redirect} from 'react-router-dom';
import localforage from 'localforage';
import Button from '../components/Button';

import './contact.css';
interface eventProps {
    id: string,
    avatar: string,
    name:string,
    url:string,
    description:string,
    feedback: string,
} 
export async function eventLoader({params}: { params: any }) {
    let events = await localforage.getItem("events") as eventProps[];
    let event = events.find((event:eventProps) => event.id === params.contactId);
    return event;
}

export async function contactAction({request, params}: any) {
    console.log(request);
    let events = await localforage.getItem("events") as eventProps[]; 
    events = events.filter((event) => event.id !== params.contactId) ;
    await localforage.setItem("events", events);
    return redirect("/");
};

export default function Contact() {
    const event = useLoaderData() as eventProps;
    const navigate = useNavigate();

    return (
        <>
        <div id="contact-back-icon">
            <Button title="Close" type="submit" height="80px" width="200px" onClick={() => navigate(-1)} />
        </div>
        <div className="contact">
            <div className="contact-head">
                <div className="contact-head-avatar">
                    <img src={event.avatar} />
                </div>
                <div className="contact-head-informations">
                    <h1>{event.name}</h1>
                    <br/>
                    <a href={event.url}>Site officielle</a>
                    <br/>
                    <br/>
                    <p>Description de l'événement:{event.description}</p>    
                </div>
            </div>
            <div className="contact-feedback">
                <p>feedback: {event.feedback}</p>
            </div>
        </div>
        </>
    )
}