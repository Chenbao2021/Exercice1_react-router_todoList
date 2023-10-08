import "./button.css"
interface buttonProps {
    title: string;
    type: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    id?: string;
    height?: string;
    width?:string;
}
function Button(props:buttonProps) {
  return (
    <div className="button-contents" id={props.id} style={{ height : props.height, width: props.width }}>
        <button 
            className='button-contents-button'
            type={props.type}
            onClick={() => {if(props.onClick) props.onClick() }}
        >
            {props.title}
        </button>
    </div>
  )
}

export default Button

