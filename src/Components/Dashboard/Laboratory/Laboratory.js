import React, {useState} from "react";
import {Radio} from "antd";
import {t} from "i18next";
import LabTests from "../LabTests/LabTests";
import LabPackages from "../LabPackages/LabPackages";
import LabPackagesCategories from "../LabPackagesCategory/LabPackagesCategories";
import LabTestCategories from "../LabTestCategories/LabTestCategories";

function Laboratory() {
    const [radioChange, setRadioChange] = useState('')

    const onChange = (e) => {
        setRadioChange(e.target.value)
    }

    return(
        <div>
            <div className={'lab_radio_btn'}>
                <Radio.Group onChange={onChange} defaultValue="packages" size="large">
                    <Radio.Button  value="tests_category">{t("Tests Categories")}</Radio.Button>
                    <Radio.Button  value="tests">{t("Tests")}</Radio.Button>
                    <Radio.Button  value="packages_category">{t("Packages Categories")}</Radio.Button>
                    <Radio.Button value="packages">{t("Packages")}</Radio.Button>
                </Radio.Group>
            </div>




            {
                radioChange === "tests" ? <LabTests /> : radioChange === "Packages" ? <LabPackages /> : radioChange === "tests_category" ? <LabTestCategories/> : radioChange === "packages_category" ? <LabPackagesCategories /> : <LabPackages />
            }
        </div>
    )
}
export default Laboratory;