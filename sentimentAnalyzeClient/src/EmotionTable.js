import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {


    render() {
        const output = this.props.emotions;
        return (
            <div>
                {/*You can remove this line and the line below. */}
                {/*JSON.stringify(this.props.emotions)*/}

                <table className="table table-bordered">
                    <tbody>
                        {
                            //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
                            output.map((data, key) => {
                                return Object.entries(data.emotion).map(([key, value]) => {
                                    // <rows key={key} val={value} />
                                    console.log(key);
                                    console.log(value);
                                    return (<tr><td>{key}</td>
                                        <td>{value}</td></tr>)
                                })
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}
export default EmotionTable;
