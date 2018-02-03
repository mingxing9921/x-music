import React, { Component } from 'react';
import Slider from 'react-slick'

class SimpleSlider extends Component {
    render() {
        const settings={
            dote:true,
            infinite:true,
            speed:200,
            autoplay:true,
            arrows:false,
            lazyLoad:true
        }
        const {data}=this.props;
        return (
            <div className='fullslider'>
                <Slider {...settings} ref={c=>this.Slider=c}>
                {
                    data.map((item)=><div><SliderItem {...item}></SliderItem></div>)
                }
                </Slider>
            </div>
        );
    }
}
class SliderItem extends Comment{
    render(){
        return(
            <a href={this.props.extra.innerurl} target='_blank' rel='noopener'>
                <img src={this.props.imgurl}/>
            </a>
        )
    }
}
export default SimpleSlider;