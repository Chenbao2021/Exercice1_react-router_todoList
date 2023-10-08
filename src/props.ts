interface buttonProps {
    title: string;
    type: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    id?: string;
    height?: string;
    width?:string;
}

interface contactIconProps {
    title: string,
    event: any,
    key:string;
}

interface eventProps {
    id: string,
    avatar: string,
    name:string,
    url:string,
    description:string,
    feedback: string,
} 