import {useState} from "react";
import { Outlet, redirect, Form, useLoaderData, useSubmit } from 'react-router-dom';
import { ContactIcon, Button } from '../components/componentMain';
import {AiOutlineSearch} from 'react-icons/ai';
import localforage from 'localforage';
import { matchSorter } from 'match-sorter';

import onlineEvents from '../firebase';

import './root.css'

export async function action() {
    let id = Math.random().toString(36).substring(2, 9);
    let event = { id, createdAt: Date.now() };
    let events = await localforage.getItem("events") as any;
    if(!events) events = [];
    events.unshift(event);
    await localforage.setItem("events", events);

    return redirect(`events/${event.id}/edit`);
} 

export async function loader({request}: any){
    let localEvents = await localforage.getItem("events") as eventProps[];
    const url = new URL(request.url);
    const q= url.searchParams.get("q");

    if(localEvents === null) {
        localEvents = [];
        await localforage.setItem("events", []);
        return {localEvents, q, onlineEvents}
    };
    if(q) {
        localEvents = matchSorter(localEvents, q, {keys: ["name"]})
    }
    return {localEvents, q, onlineEvents};
}

function Root() {
    const {localEvents:events, q, onlineEvents} = useLoaderData() as any;
    const submit = useSubmit();

    const [displayOnline, setDisplayOnline ] = useState(false);
    const setOnline = () => setDisplayOnline(true);
    const setLocal = () => setDisplayOnline(false);
    return (
        <div className='root'>
            <div className="root-left">
                <div className="root-left-search">
                    <Form className='root-left-search-input' id="search-form" role="search">
                        <div className="root-left-search-input-icon">
                            <AiOutlineSearch size={20} color={'grey'}/>
                        </div>
                        <input
                            id="q"
                            placeholder='Search'
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                submit(event.currentTarget.form);
                            }}
                        />
                    </Form>
                    <Form method="post">
                        <Button title="New" type="submit" />
                    </Form>
                </div>
                <div className='root-left-list'>
                    <div className="root-left-list-options">
                        <button onClick={setLocal} className={displayOnline ? "buttonClicked" : ""}>Local</button>
                        <button onClick={setOnline} className={!displayOnline ? "buttonClicked" : ""}>Online</button>
                    </div>
                    {
                        displayOnline ?
                            <div className="root-left-list-online" >
                                {onlineEvents.map((event:eventProps) => (
                                    <ContactIcon event={event} title={event.name} key={event.id}/>
                                ))}    
                            </div>
                        :
                            <div className="root-left-list-local">
                                {events.length !== 0 && events.map((event:eventProps) => (
                                    <ContactIcon event={event} title={event.name} key={event.id}/>
                                ))}
                            </div>
                    }
                </div>
            </div>
            <div className="root-right">
                <Outlet />
            </div>        
        </div>
    )
}

export default Root