import React from "react";

const RupiahFormatter = ({ value }) => {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);

    return <>{formattedPrice}</>;
};

export default RupiahFormatter;
