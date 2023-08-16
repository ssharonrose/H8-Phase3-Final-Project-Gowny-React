import { useEffect } from "react";
import { useState } from "react";

const AddEditDressFormPart2 = ({ detailDressFromPage }) => {
    console.log("rendered");
    console.log("detailDressFromPage", detailDressFromPage);

    const [formValue, setFormValue] = useState()

    useEffect(
        () => {
            const images = { ...detailDressFromPage.Images }
            const newObj = { ...detailDressFromPage }
            newObj.Images = images
            setFormValue(newObj);
        }, [detailDressFromPage]
    )

    return (
        <>
            <pre>{JSON.stringify(detailDressFromPage, null, 4)}</pre>
            {/* <input value={detailDressFromPage?.Images?.length ? detailDressFromPage.Images[0]?.name : "Kosong"} onChange={() => { }} /> */}
            <input value={formValue?.Images[0]?.name} />
            <input value={formValue?.name} onChange={() => { }} />
            {/* <input /> */}
        </>
    )
}

export default AddEditDressFormPart2;