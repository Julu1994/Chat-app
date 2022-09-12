import "./search.scss";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Input } from "@mui/material";

const Search = ({ onchange, onkeydown }) => {
    const ariaLabel = { "aria-label": "description" };
    return (
        <div className="search">
            <AiOutlineSearch size={25} style={{ paddingTop: ".4rem" }} />
            <Input
                placeholder={"Search people"}
                color="warning"
                inputProps={ariaLabel}
                onChange={onchange}
                onKeyDown={onkeydown}
                sx={{
                    width: "70%",
                    textAlign: "center",
                    color: "white",
                    ml: ".2rem",
                    pb: ".2rem",
                }}
            />
        </div>
    );
};

export default Search;
