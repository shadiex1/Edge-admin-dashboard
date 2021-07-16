import React, { Component } from "react";
import styles from "./EditSliderImgs.module.scss";
import Carousel from "nuka-carousel";
import { CloseIcon } from "../../Components/svg";

class EditSliderImgs extends Component {
  state = {
    files: [],
  };

  fileSelectedHandler = (e) => {
    this.setState({ files: [...this.state.files, ...e.target.files] });
  };
  deleteImgHandler = (img) => {
    const files = [...this.state.files];
    const index = files.indexOf(img);
    if (index > -1) {
      files.splice(index, 1);
      this.setState({
        files,
      });
    }
  };
  render() {
    const {files}=this.state
    const { imgs, changeSliderImgs } = this.props;
    return (
      <div>
        <p className={styles.header}>Current Slider</p>
        <div className={styles.Carousel}>
          <Carousel
            heightMode="max"
            autoplay
            wrapAround
            defaultControlsConfig={{
              containerClassName: `${styles.container}`,
              nextButtonText: ">",
              prevButtonText: "<",
              prevButtonClassName: `${styles.prev}`,
              nextButtonClassName: `${styles.next}`,
              pagingDotsClassName: `${styles.pagingDots}`,
              pagingDotsContainerClassName: `${styles.pagingContainer}`,
            }}
          >
            {imgs.map((img) => (
              <div className={styles.carouselImg}>
                <img src={`http://18.221.156.111:3001/${img}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className={styles.Upload}>
          <h2>Upload images</h2>
          <div className={styles.imgs}>
            {files.map((img) => (
              <div className={styles.imgConatiner}>
                <img src={URL.createObjectURL(img)} />{" "}
                <span onClick={() => this.deleteImgHandler(img)}>
                  <CloseIcon />
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              className={styles.input}
              type="file"
              multiple
              onChange={this.fileSelectedHandler}
            />
            {this.state.files.length ? (
              <button
                onClick={() => changeSliderImgs(files)}
                className={styles.submit}
              >
                Submit
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
export default EditSliderImgs;
