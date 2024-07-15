import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ExpandMoreProps, GameDetailsProps } from '../../types/components';

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const MiniCard = ({ game }: GameDetailsProps) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{
            maxWidth: '300px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#040c16',
            height: '100%'
        }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon className='text-primaryLight' />
                    </IconButton>
                }
                title={
                    <span className="text-secondaryBlue text-left text-xl">{game?.name}</span>
                }
                sx={{ display: 'flex', flexDirection: 'row', height: '160px', justifyContent: 'flex-between', alignItems: 'flex-start' }}
                subheader={
                    <span className="text-primaryLight">{`Release date: ${new Date(game?.released).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}`}</span>
                }
            />
            <CardMedia
                component="img"
                height="194"
                image={game?.background_image}
                alt={game?.name}
                sx={{ height: '194px', objectFit: "contain" }}
            />
            <CardContent sx={{ gap: '20px' }}>
                <p color="colors-light">
                    <p className='font-bold'>Genres:</p>
                    {game?.genres?.map((genre) => genre.name).join(', ') || 'No information'}
                </p>
                <p color="colors-light">
                    <p className='font-bold'>Platform:</p>
                    {game?.parent_platforms?.map((detail) => detail.platform.name).join(', ') || 'No information'}
                </p>
                <p color="colors-light">
                    <p className='font-bold'>Metascore:</p>
                    {game?.metacritic || 'No information'}
                </p>
                <p color="colors-light">
                    <p className='font-bold'>Available on:</p>
                    {game?.stores?.map((details) => details.store.name).join(', ') || 'No information'}
                </p>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon className='text-primaryLight' />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon className='text-primaryLight' />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon className='text-primaryLight' />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <p className='font-bold'>Tags:</p>
                    <p>{game?.tags.length > 0 && game?.tags?.map((tag) => tag.name).join(', ') || 'No information'}</p>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default MiniCard;
