import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MdDeleteForever } from 'react-icons/md';
import { useAuth } from '@/src/components/AuthProvider';
import { GameDetailsProps } from '../types/components';
import {
  addFavoriteGamesToUser,
  removeFavoriteGameFromUser,
} from 'services/userAPI';
import { useRouter, usePathname } from 'next/navigation';

const GameCard = ({ game }: GameDetailsProps) => {
  const { user, gamesList, setGamesList } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const isFavorite = gamesList.some((g) => g.id === game.id);
    setIsOwner(isFavorite);
  }, [gamesList, game?.id]);

  const handleAddFavorite = useCallback(async () => {
    await addFavoriteGamesToUser(user.id, game?.id.toString(), game);
    setGamesList([...gamesList, game]);
    router.replace('/favorites');
  }, [user?.id, game, gamesList, setGamesList]);

  const handleRemoveFavorite = useCallback(async () => {
    await removeFavoriteGameFromUser(user.id, game.id.toString(), setGamesList);
    setGamesList(gamesList.filter((g) => g.id !== game?.id));
  }, [user?.id, game?.id, gamesList, setGamesList]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        width: '100%',
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        backgroundColor: '#e9f1fb',
        height: '100%',
        borderRadius: '25px',
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon className="text-darkPurple" />
          </IconButton>
        }
        title={
          <span className="text-left text-xl text-darkPurple lg:text-2xl">
            {game?.name}
          </span>
        }
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: '150px',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '10px',
        }}
        subheader={
          <span className="text-darkPurple">{`Release date: ${new Date(
            game?.released
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`}</span>
        }
      />
      <CardMedia
        component="img"
        height={194}
        image={game?.background_image || ''}
        alt={game?.name}
        sx={{ height: '194px' }}
      />
      <CardActions
        disableSpacing
        className="mx-4 flex flex-row items-center justify-between md:mx-2"
      >
        {user ? (
          <div>
            <IconButton aria-label="add to favorites">
              {pathName === '/favorites' ? (
                <MdDeleteForever
                  onClick={handleRemoveFavorite}
                  className="text-2xl text-primaryDark"
                />
              ) : (
                <FavoriteIcon
                  onClick={handleAddFavorite}
                  className={`text-2xl ${isOwner ? 'text-primaryRed' : 'text-primaryDark'}`}
                />
              )}
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon className="text-darkPurple" />
            </IconButton>
          </div>
        ) : (
          <div></div>
        )}
        <div className="cursor-pointer self-center hover:font-bold hover:text-primaryPurple">
          <Link href={`/games/${game?.id}`} aria-label={'Game details'}>
            Learn more
          </Link>
        </div>
      </CardActions>
    </Card>
  );
};

export default GameCard;
