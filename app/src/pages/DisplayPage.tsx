import { Container, Grid } from "@mui/material"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { getExplanation, getMarkDownMindMap } from "../apiFunctions"
import ExplanationBox from "../components/ExplanationBox"
import MarkMapBox from "../components/MarkMapBox"
import useControlStore from "../hooks/useControlStore"

const DisplayPage = () => {
    const { index, query } = useControlStore()
    const {
        data: mmData,
        isLoading: mmLoading,
        refetch: mmRefetch,
    } = useQuery(["get-markdown-mindmap", query], getMarkDownMindMap(query), { enabled: false })

    const {
        data: ndata,
        isLoading: nLoading,
        refetch: nRefetch,
    } = useQuery(["get-explanation", query], getExplanation(query), { enabled: false })

    useEffect(() => {
        if (query !== "") {
            console.log(query)
            mmRefetch()
            nRefetch()
        }
    }, [query, mmRefetch, nRefetch])

    return (
        <Container maxWidth={false} sx={{ display: "flex", mb: "2rem", alignItems: "center" }}>
            <Grid container sx={{ width: "100%" }}>
                {/* place holder */}
                <Grid item xs={0} md={1} lg={2}></Grid>
                <Grid item xs={12} md={10} lg={8}>
                    {index === 0 ? (
                        <MarkMapBox data={mmData} isLoading={mmLoading} />
                    ) : index === 1 ? (
                        <ExplanationBox data={ndata} isLoading={nLoading} />
                    ) : (
                        <></>
                    )}
                </Grid>
                <Grid item xs={0} md={1} lg={2}></Grid>
            </Grid>
        </Container>
    )
}

export default DisplayPage
