import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../saga/actions";
import { bindActionCreators } from "@reduxjs/toolkit";
import Header from "../components/Header";

function AdminPanel() {

    const dispatch = useDispatch();
    const { addShop, addGood } = bindActionCreators(actions, dispatch);

    const [shopName, setShopName] = useState('');
    const [goodName, setGoodName] = useState('');
    const [shopId, setShopId] = useState('');

    return (
        <>
            <Header />
            <div>
                <label htmlFor="shopName">Shop name</label>
                <input name="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} />
                <button onClick={() => addShop({ shopName })}>Add shop</button>
            </div>

            <div>
                <label htmlFor="goodName">Good name</label>
                <input name="goodName" value={goodName} onChange={(e) => setGoodName(e.target.value)} />
                <label htmlFor="shopId">shopId</label>
                <input name="shopId" value={shopId} onChange={(e) => setShopId(e.target.value)} />
                <button onClick={() => addGood({ name: goodName, shopId })}>Add good</button>
            </div>
        </>
    );

};

export default AdminPanel;