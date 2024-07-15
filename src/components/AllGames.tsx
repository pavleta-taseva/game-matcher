import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { SearchProps } from 'types/components';
import { getGamesByPage } from 'services/api';
import { colors } from '../../assets/styles/colors';

const AllGames = ({ gamesList, setGamesList, totalGamesCount, setTotalGamesCount, currentPage, setCurrentPage }: SearchProps) => {
    const [countOfGamesPerPage] = useState(30);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        if (totalGamesCount && gamesList) {
            const pagesCount = Math.ceil(totalGamesCount / countOfGamesPerPage);
            setTotalPages(pagesCount);
        }
    }, [totalGamesCount]);

    const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage && setCurrentPage(value);
        await getGamesByPage({ setGamesList, setTotalGamesCount, currentPage: value, setCurrentPage });
    };

    return (
        <>
            <div className='flex flex-col justify-between mt-12 mb-0 lg:flex-row'>
                <Stack spacing={2}>
                    <Pagination
                        color='primary'
                        count={totalPages ?? 0}
                        variant="outlined"
                        shape="rounded"
                        page={currentPage}
                        onChange={handleChange}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: colors.textColor.primaryLight,
                                borderColor: colors.textColor.primaryLight,
                                marginBottom: 4,
                            },
                            '& .MuiPaginationItem-root.Mui-selected': {
                                color: colors.textColor.secondaryBlue,
                                borderColor: colors.textColor.secondaryBlue,
                            },
                            '& .MuiPaginationItem-root:hover': {
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            },
                        }}
                    />
                </Stack>
                <h2 className="text-xl font-semibold text-secondaryBlue">
                    Items found: {totalGamesCount && totalGamesCount.toLocaleString('en')}
                </h2>
            </div>

            <div className='grid gap-x-2 gap-y-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-lg justify-items-center place-items-center w-full py-12 px-4 bg-secondaryGrey opacity-90 shadow-grey overflow-auto'>
                {gamesList && gamesList?.length > 0 &&
                    gamesList?.map((game) => (
                        game?.id && <GameCard key={game?.id} game={game} />
                    ))
                }
            </div>
        </>
    )
}

export default AllGames;