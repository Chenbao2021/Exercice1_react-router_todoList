import {Form, NavLink} from 'react-router-dom'
import Button from './Button'

import "./contactIcon.css"
interface contactIconProps {
    title: string,
    event: any,
    key:string;
}
function ContactIcon(props: contactIconProps) {
  return (        
    <div className="contact-icon">                   
        <NavLink key={props.event.id}
            to={`events/${props.event.id}`}
            className='contact-icon-link'
        >
            <p>{props.title}</p>
        </NavLink>
        <Form action={`/events/${props.event.id}/edit`}>
            <Button title="edit" type="submit"/>
        </Form>
        <Form method='post' id="contact-form-delete" action={`/events/${props.event.id}/delete`}>
            <Button title='delete' type="submit" />
        </Form>
    </div>

  )
}

export default ContactIcon