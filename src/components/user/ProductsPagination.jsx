import { Box, Pagination } from "@mui/material"
import { useEffect, useState } from "react";

const pageSize = 6;

export default function ProductPagination ({setProduct}) {
    const [pagination, setPagination]=useState({
        count: 0,
        from: 0,
        to: pageSize
    });

    // useEffect(() => {
    //     service.getdata({from:pagination.from, to:pagination.to}).then(response => {
    //         setPagination({...pagination, count:response.count});
    //     })
    // },[pagination.from, pagination.to])

    const handleChange = (event, page) => {
        const from = (page-1) * pageSize;
        const to = (page-1) * pageSize + pageSize

        setPagination({...pagination, from:from, to:to});
    }

    return (
        <Box>
            <Pagination
                count={Math.ceil(pagination.count/ pageSize)}
                onChange={handleChange}
            />
        </Box>
    )
}