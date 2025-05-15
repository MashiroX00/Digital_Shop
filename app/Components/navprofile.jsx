
export default function Usernav(props) {
    return (
        <nav className="flex h-1/4 bg-[var(--oxford-blue)] w-full object-contain justify-end border-b drop-shadow-md">
            <ul className="flex flex-row gap-4 content-center place-items-center pr-3 md:text-xl text-[var(--mikado-yellow)]">
                <li>Credit: {props.user.credit}</li>
                <li>Username:{props.user.username}</li>
                <li><img src={props.user.userimage} alt="" className="max-h-[2rem] md:max-h-[4rem] object-cover border rounded-full"/></li>
            </ul>
        </nav>
    );
}