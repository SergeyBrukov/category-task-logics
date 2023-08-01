import styles from "./category-list.module.scss"
import {FC} from "react";
import {AiFillDelete, AiTwotoneEdit} from "react-icons/ai";

interface ICategoryItem {
    categoryData: any,
    className: string,
    type: string,
    handleDeleteCategory: (id:string, type: string) => void
}

const CategoryItem: FC<ICategoryItem> = ({categoryData, className, handleDeleteCategory, type}) => {


    const {id, title, description} = categoryData;

    return (
        <div className={`${styles.card} ${styles[className]}`}>
            <b></b>
            <div className={styles.mainInfo}>
                <span>{id}</span>
                <p>Title: {title}</p>
                <p>Description: {description}</p>
            </div>
            <div className={styles.content}>
                <p className={styles.title}>Some action</p>
                <ul className={styles.sci}>
                    <li>
                        <AiFillDelete onClick={() => handleDeleteCategory(id, type)}/>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CategoryItem