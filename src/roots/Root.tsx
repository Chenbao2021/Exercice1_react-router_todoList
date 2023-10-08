import { Outlet, redirect, Form, useLoaderData, useSubmit } from 'react-router-dom'
import { ContactIcon, Button } from '../components/componentMain';
import {AiOutlineSearch} from 'react-icons/ai';
import localforage from 'localforage';
import { matchSorter } from 'match-sorter';

import './root.css'

export async function action() {
    let id = Math.random().toString(36).substring(2, 9);
    let event = { id, createdAt: Date.now() };
    let events = await localforage.getItem("events") as any;
    if(!events) events = [];
    events.unshift(event);
    await localforage.setItem("events", events);

    return redirect(`/events/${event.id}/edit`);
} 

export async function loader({request}: any){
    let bob = { 
        name: "Bob éponge", 
        url: "https://bob-leponge.fandom.com/fr/wiki/Bob_l%27%C3%A9ponge",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL1TG2Q9tHrYKGdVFdXa9Lc0x4RdJzQ2ySwA&usqp=CAU",
        description: "Un éponge qui vit dans la mer, et qui a un voisin qui s'appelle 'Patrick'",
        feedback: "I like Bob éponge, Nice one",
        createdAt: Date.now(),
        id: Math.random().toString(36).substring(2, 9),
    }
    const url = new URL(request.url);
    const q= url.searchParams.get("q");
    let events = await localforage.getItem("events") as any;

    if(events === null || events.length === 0) {
        events = [];
        events.unshift(bob);
        await localforage.setItem("events", events);
        return {events, q}
    };
    if(q) {
        events = matchSorter(events, q, {keys: ["name"]})
    }
    return {events, q};
}

function Root() {
    const {events, q} = useLoaderData() as any;
    const submit = useSubmit();
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
                {events.length ? (
                    <div className='root-left-list'>
                        {events.map((event:any) => (
                            <ContactIcon event={event} title={event.name} key={event.id}/>
                        ))}
                    </div>
                ) : (
                    <p>
                    <i>No contacts</i>
                    </p>
                )}
            </div>
            <div className="root-right">
                <Outlet />
            </div>        
        </div>
    )
}

export default Root