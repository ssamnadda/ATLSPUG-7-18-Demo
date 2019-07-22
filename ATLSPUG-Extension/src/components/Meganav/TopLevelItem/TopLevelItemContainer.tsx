import * as classnames from 'classnames';
import { observer } from 'mobx-react';
import * as React from 'react';
import { MeganavStore, meganavStore } from '../MeganavStore';
import styles from '../../Meganav/siteMeganav.module.scss';
import MdClose from 'react-ionicons';
import * as ReactDOM from 'react-dom';

export interface ITopLevelItemContainerProps {
    display: boolean;
    onClick?: () => void;
}
@observer
export default class TopLevelItemContainer extends React.Component<ITopLevelItemContainerProps, {}> {

    constructor(props) {
        super(props);
        this.selector = React.createRef();
    }
    private selector;
    public componentDidMount() {
        if (this.props.display) {
            const rect = this.selector.current.getBoundingClientRect();
            console.log(this.props.display,rect);
        }        
    }
    public componentWillReceiveProps(nextProps) {
        
    }
    private store: MeganavStore = meganavStore;

    public render(): JSX.Element {
        const store = this.store;
        
        
        
        return (
                <div className={styles.megaMenuSec} ref={this.selector} style={{ display: this.props.display ? "block" : "none", width: window.innerWidth + 'px' }}>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.column}>
                                <div className={ classnames(styles.closeBtn, "close-btn")}>
                                    <button onClick={() => {
                                        this.props.onClick ? this.props.onClick() : store.closeAll(true)
                                    }} type="text/button">
                                        <MdClose
                                            className={styles.icon}
                                        />
                                    </button>
                                </div>

                                <div className={styles.topMenuSec}>
                                    {
                                        this.props.children
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}