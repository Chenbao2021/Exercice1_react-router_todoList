import {Form, useNavigate, redirect, useLoaderData } from "react-router-dom";
import {Button} from "../components/componentMain"
import localforage from "localforage";

import "./create.css"

export async function editAction({request, params}: {request:any , params:any}) {

    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    let events = await localforage.getItem('events') as eventProps[];
    let event = events.find(event => event.id === params.contactId) as eventProps;
    Object.assign(event, updates);
    await localforage.setItem('events', events);
    
    return redirect(`/feedback/events/${params.contactId}`);
}

function Create() {
    const navigate = useNavigate();
    const event = useLoaderData() as eventProps;
    return (
        <Form method='post' id="create-form" style={{ overflow: "scroll", height: '100%' }}>
            <label>
                <span>Name</span>
                <input 
                    placeholder="nom de l'événement"
                    type='text'
                    name='name'
                    defaultValue={event.name}
                />
            </label>
            <label>
                <span>URL:</span>
                <input 
                    type="text"
                    name="url"
                    placeholder='www.yuchenbao.com/huodong'
                    defaultValue={event.url}
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    type="text"
                    name="avatar"
                    placeholder='Tell something about this event.'
                    defaultValue={event.avatar}
                />
            </label>
            <label>
                <span>Description</span>
                <textarea
                    name="description"
                    rows={10}
                    placeholder='What do you think about this event?'
                    defaultValue={event.description}
                />
            </label>
            <label>
                <span>Feedback</span>
                <textarea
                    name="feedback"
                    rows={10}
                    placeholder='What do you think about this event?'
                    defaultValue={event.feedback}
                />
            </label>
            <div className="create-form-buttons">
                <div></div>
                <div>
                    <Button 
                        type='submit'
                        title='Save'
                    />
                    <Button 
                        type='submit'
                        title='Cancel'
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                </div>
            </div>
        </Form>
    )
}

export default Create