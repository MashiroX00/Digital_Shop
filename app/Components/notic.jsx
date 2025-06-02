export default function NotificationPoint(props) {
    const point = props.point || 0;
    return (
        <span className="w-fit h-fit rounded-full bg-red-600 p-1">{point}</span>
    );
}
