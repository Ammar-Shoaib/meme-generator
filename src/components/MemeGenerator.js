import React, { useState, useEffect } from 'react'

const MemeGenerator = () => {

    const [state, setState] = useState({
        topText:"",
        bottomText:"",
        randMemeImg:"http://i.imgflip.com/1bij.jpg",
        allMemeImgs:[]
    })

    const getMemes = async () => {
        const response = await fetch('https://api.imgflip.com/get_memes')
        const allImgs = await response.json()
        setState(prevState => {
            const {memes} = allImgs.data
            return {
                ...prevState,
                allMemeImgs: memes
            }
        })
    }

    useEffect(() => {
        getMemes()
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target

        setState({ ...state, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const random = Math.floor(Math.random() * state.allMemeImgs.length)
        const randImg = state.allMemeImgs[random].url
        setState(prevState => {
            return {
                ...prevState,
                randMemeImg:randImg,
                topText:"",
                bottomText:""
            }
        })
    }

    function createRipple(event) {
        const button = event.currentTarget;

        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add("ripple");

        const ripple = button.getElementsByClassName("ripple")[0];

        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const buttons = document.getElementsByTagName("button");
    for (const button of buttons) {
        button.addEventListener("click", createRipple);
    }

    return (
        <div>
            <form className="meme-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={state.topText} 
                    name="topText" 
                    placeholder="Top Text" 
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    value={state.bottomText} 
                    name="bottomText" 
                    placeholder="Bottom Text" 
                    onChange={handleChange}
                />
                <button type="submit">Gen</button>
            </form>
            <div className="meme">
                <img src={state.randMemeImg} alt="MemeImg" />
                <h2 className='top'>{state.topText}</h2>
                <h2 className='bottom'>{state.bottomText}</h2>
            </div>
        </div>
    )
}

export default MemeGenerator
