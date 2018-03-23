import React from 'react';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
const styles = {
  card: {
    maxWidth: 345,
    margin: 5
  },
  media: {
    height: 200,
  },
};
class MovieCard extends React.Component {
  render() {
    return (
      <Card style={styles.card}>
        <CardMedia style={styles.media} image={this.props.data.image}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {this.props.data.title}
          </Typography>
          <Typography component="p">
          {this.props.data.description}
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default MovieCard;