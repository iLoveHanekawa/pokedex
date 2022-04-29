import React from "react";
import BallIcon from "./BallIcon";
import some_image from "../images/some_image.png"

export default function DexButton(props) {

    const buttonStyles = {
        width: "26.375rem",
        height: "2.625rem",
        backgroundImage: props.select == props.name? "linear-gradient(110deg, #F84E1A 0%, #F84E1A 44.75%, black 45%, black 100%)": "none",
        borderRadius: "999999rem",
        textIndent: "2.7rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: props.select == props.name? "white": "black",
        boxShadow: props.select == props.name? "0px 0px 0.9rem black": "none"
    }
    
    const titleFlexStyles = {
        display: "flex",
        justifyContent: "space-between",
        width: "17rem",
        alignItems: "center",
        paddingLeft: "7rem",
        paddingRight: "1rem"
    }
    const fixedName = props.name[0].toUpperCase() + props.name.slice(1, props.name.length)

    return <div onMouseEnter = {async () => {
        props.setSelect(props.name)
        if(!(props.name in props.allImages)) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
            const data = await response.json()
            props.setPreview(data.sprites.other['official-artwork'].front_default)
            props.setAllImages(i => {
                return {
                    ...i,
                    [props.name]: data.sprites.other['official-artwork'].front_default
                }
            })
        }
        else {
            props.setPreview(props.allImages[props.name])
        }
    }} style = {buttonStyles}>
        {props.index + 1}
        <div style = {titleFlexStyles}>
            <div>{fixedName}</div>
            <BallIcon color = {props.select == props.name? "white": "black"}/>
        </div>
    </div>
}