import React, { Component } from "react";
// import {Link} from 'react-router-dom'
class MusicList extends Component {
  render() {
    return (
      <div>
        {this.props.data.length === 0 ? (
          ""
        ) : (
          <div>
            <div className="recommod" />
            <div style={Styles.container}>
              {this.props.data.map((obj, index) => (
                <MusicItem
                  key={index}
                  data={obj}
                  scrollTop={this.props.scrollTop}
                  history={this.props.history}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default MusicList;

class MusicItem extends Component {
  goAlbum() {
    this.props.scrollTop();
    //console.log(this.props.history);
    this.props.history.push(`/album/${this.props.data.specialid}`);
  }
  render() {
    const {
      specialname,
      imgurl,
      intro,
      playcount,
      specialid
    } = this.props.data;
    const imgurl2 = imgurl.replace("{size}", 400);
    return (
      <div style={Styles.containerItem} onClick={() => this.goAlbum()}>
        <div style={Styles.item}>
          <div style={Styles.count}>{parseInt(playcount / 10000) + "万"}</div>
          <img src={imgurl2} style={Styles.img} />
          <div style={Styles.name}>{specialname}</div>
        </div>
      </div>
    );
  }
}
const Styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  containerItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#333",
    backgroungColor: "#f0f0f0",
    marginBottom: "1rem"
  },
  name: {
    display: "flex",
    justifyContent: "flex-start",
    fontSize: "0.8rem",
    width: "9rem"
  },
  item: {
    position: "relative"
  },
  img: {
    width: "9rem"
  },
  count: {
    position: "absolute",
    width: "100%",
    textAlign: "right",
    color: "#fff",
    top: 0,
    left: 0,
    fontSize: ".8rem",
    backgroundColor: "rgba(153, 153, 153, 0.4)"
  }
};
