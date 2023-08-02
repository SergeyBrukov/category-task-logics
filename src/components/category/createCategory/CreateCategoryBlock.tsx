import styles from "../category.module.scss";
import {FC, useState} from "react";
import CreateCategoryFrom from "./CreateCategoryFrom";
import {CategoriesInterface, CreateCategoryInterface} from "../../../utils/interface";
import {ChoseCategoryCreateSelectType} from "../../../utils/type";


interface ICreateCategoryBlock {
  createCategory: (data: CreateCategoryInterface, choseCategoryCreateSelect?: ChoseCategoryCreateSelectType) => void,
  categoryList: CategoriesInterface[]
}

const CreateCategoryBlock: FC<ICreateCategoryBlock> = ({createCategory, categoryList}) => {

  const [visibleCreateCategoryForm, setVisibleCreateCategoryFrom] = useState<boolean>(false);

  return (
    <div>
      <CreateCategoryFrom visible={visibleCreateCategoryForm} categoryList={categoryList} setVisible={setVisibleCreateCategoryFrom} createCategory={createCategory} />
      <button className={styles.btn} type="button" onClick={() => setVisibleCreateCategoryFrom(true)}>
        <strong>Create category</strong>
        <div className={styles.containerStars}>
          <div className={styles.stars}></div>
        </div>
        <div className={styles.glow}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      </button>
    </div>
  );
};

export default CreateCategoryBlock;