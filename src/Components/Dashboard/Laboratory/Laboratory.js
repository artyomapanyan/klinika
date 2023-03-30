import React, {useEffect, useState} from "react";
import {Radio} from "antd";
import {t} from "i18next";
import LabTests from "../LabTests/LabTests";
import LabPackages from "../LabPackages/LabPackages";
import LabPackagesCategories from "../LabPackagesCategory/LabPackagesCategories";
import LabTestCategories from "../LabTestCategories/LabTestCategories";
import {useSearchParams} from "react-router-dom";

function Laboratory() {
    let [searchParams, setSearchParams] = useSearchParams();

    const onChange = (e) => {
        setSearchParams({lab:e.target.value})
    }
    let getLab = searchParams.get('lab')

    return(
        <div style={{marginTop: -30}}>
            <div className={'lab_radio_btn'}>
                <Radio.Group onChange={onChange} value={getLab ? getLab : 'packages'} size="large">
                    <Radio.Button  value="tests_category">{t("Tests Categories")}</Radio.Button>
                    <Radio.Button  value="tests">{t("Tests")}</Radio.Button>
                    <Radio.Button  value="packages_category">{t("Packages Categories")}</Radio.Button>
                    <Radio.Button value="packages">{t("Packages")}</Radio.Button>
                </Radio.Group>
            </div>




            {
                getLab === "tests" ? <LabTests getLab={getLab} /> : getLab === "packages" ? <LabPackages /> : getLab === "tests_category" ? <LabTestCategories/> : getLab === "packages_category" ? <LabPackagesCategories /> : <LabPackages />
            }
        </div>
    )
}
export default Laboratory;