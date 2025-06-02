import MenuCard from "../../Components/menucard";
import menuData from "./productMenu.json"
export default function Admin() {
    const menuItems = menuData.map((key, index) => {
        return (
            <MenuCard 
            key={index}
            title={key.title}
            detail={key.detail}
            page={key.page}
            />
        )
    })
    return (
        <div className="flex flex-col gap-4 mx-5 my-5 md:mx-20 md:my-20">
            <h1 className="text-lg md:text-xl font-bold underline underline-offset-2">Welcome to productMenu.</h1>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {menuItems}
            </div>
        </div>
    )
}