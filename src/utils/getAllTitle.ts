type TTitle = {
    title: string
}

const getAllTitles = <T>(data:T[]) => {
    const titles:TTitle[] = [];
    data.forEach((item:any) => {
        if (item.title) {
            titles.push({ title: item.title });
        }
        if (item.subCategory && item.subCategory.length > 0) {
            const subTitles = getAllTitles(item.subCategory);
            titles.push(...subTitles);
        }
    });
    return titles;
}


export const examinationExistTitle = <T>(data:T[], title:string) => {
    const titles = getAllTitles<T>(data);

    return titles.some(item => item.title === title);

}