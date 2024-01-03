import { AccountTree, Description } from "@mui/icons-material"
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material"
import animateScrollTo from "animated-scroll-to"
import { useEffect, useRef, useState } from "react"
import useControlStore from "../hooks/useControlStore"
import SNOW_WHITE from "../story/snow_white"

const BUTTON_GROUPS = [
    { name: "MindMap", icon: <AccountTree /> },
    { name: "Explain", icon: <Description /> },
]

const TextEntryPage = () => {
    const [text, setText] = useState(SNOW_WHITE)
    const { index, setIndex, setQuery } = useControlStore()
    const buttonGroupRef = useRef<Element>()

    const onScroll = () => {
        if (buttonGroupRef.current) {
            let element = buttonGroupRef.current
            let elemRect = element.getBoundingClientRect()
            if (elemRect.top < 30 && !element.classList.contains("Down")) {
                element.classList.remove("Up")
                element.classList.add("Down")
            }

            if (elemRect.bottom > 300 && !element.classList.contains("Up")) {
                element.classList.remove("Down")
                element.classList.add("Up")
            }
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: false })
        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [])

    const ClickButton = (index: number) => {
        setIndex(index)
        setQuery(text)
        if (buttonGroupRef.current) {
            animateScrollTo(buttonGroupRef.current, { speed: 1000 })
        }
    }

    return (
        <Container
            id="text-entry-page"
            maxWidth={false}
            sx={{ mt: "4rem", height: "100vh", display: "flex", alignItems: "center" }}
        >
            <Grid container sx={{ width: "100%" }}>
                {/* place holder */}
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8}>
                    <Typography fontWeight={600} sx={{ m: "1rem" }}>
                        Put Your Drafts Here:
                    </Typography>
                    <TextField
                        className="round-text-field"
                        multiline
                        fullWidth
                        rows={16}
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                        }}
                    />
                    <Box
                        ref={buttonGroupRef}
                        display="flex"
                        justifyContent="space-around"
                        marginTop="2rem"
                        gap="10px"
                    >
                        {BUTTON_GROUPS.map((button, i) => (
                            <Button
                                variant={index === i ? "contained" : "outlined"}
                                size="large"
                                startIcon={button.icon}
                                key={button.name}
                                onClick={() => ClickButton(i)}
                            >
                                {button.name}
                            </Button>
                        ))}
                    </Box>
                </Grid>
                {/* place holder */}
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
        </Container>
    )
}

export default TextEntryPage
