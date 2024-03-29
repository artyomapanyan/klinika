import React from 'react';
import {Route, Routes} from "react-router";
import General from "./Auth/General";
import AppLayout from "./AppLayout";
import AuthCheck from "./Fragments/AuthCheck";
import Reset from "./Auth/Reset";
import Forgot from "./Auth/Forgot";
import Login from "./Auth/Login/Login";
import AllOffers from "./AllOffers/AllOffers";
import OfferBook from "./AllOffers/OfferBook/OfferBook";
import ThankYouOffer from "./AllOffers/ThankYouOffer/ThankYouOffer";
import OfferMap from "./AllOffers/ThankYouOffer/Fragments/OfferMap";

/**offer new version */
import OfferBookNew from "./AllOffers/OfferBookNew/OfferBookNew";
import NewThankYouOffer from "./AllOffers/NewThankYouOffer/NewThankYouOffer";
import AccountDeleteProcess from "./AccountDeleteProcess/AccountDeleteProcess";

import MoyasarPage from "./AllOffers/Moyasar/MoyasarPage";



function AppRoutes(){
    return(<Routes>
                <Route path={'/'} element={<Login goBackBtn={false}/>}></Route>
                <Route path={'/password/reset/:token'} element={<Reset/>}></Route>
                <Route path={'forgot'} element={<Forgot/>}></Route>
                <Route path={'dashboard/*'} element={<AuthCheck><AppLayout/></AuthCheck>}></Route>
                <Route path={'login'} element={<Login goBackBtn={true}/>}></Route>
                <Route path={'offers'} element={<AllOffers/>}></Route>
            {/*<Route path={'offers/:id'} element={<OfferBook/>}></Route>*/}
            <Route path={'offers/:id'} element={<OfferBookNew/>}></Route>

                {/*<Route path={'thank-you'} element={<ThankYouOffer/>}></Route>*/}
            <Route path={'offers/:id/thank-you'} element={<NewThankYouOffer/>}></Route>
                <Route path={'maps'} element={<OfferMap/>}></Route>
            <Route path={'account_delete_process'} element={<AccountDeleteProcess/>}></Route>
            <Route path={'pay-online/moyasar'} element={<MoyasarPage/>}></Route>




            </Routes>


    )
}
export default AppRoutes
