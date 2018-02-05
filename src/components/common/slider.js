import React, {Component} from 'react';
import Slider from 'react-slick'

class SimpleSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 200,
            autoplay: true,
            arrows: false,
            lazyLoad: true
        }
        const {data} = this.props;
        return (
            <div className='fullSlide'>
                <Slider {...settings} ref={c => this.Slider = c}>
                    {data.map((item, index) => <div key={index}>
                        <SliderItem {...item}></SliderItem>
                    </div>)
}
                </Slider>
            </div>
        );
    }
}
export default SimpleSlider;
class SliderItem extends Component {
    render() {
        return (
            <a href={this.props.extra.innerurl} target='_blank' rel='noopener'>
                <img src={this.props.imgurl}/>
            </a>
        )
    }
}