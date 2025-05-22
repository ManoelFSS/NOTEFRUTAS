
import { LoaderContainer, Dot } from './styles';

const Loading = ({$marginBottom}) => {
    return (
        <LoaderContainer style={{ marginBottom: $marginBottom }}>
            <Dot color="#e74c3c" $delay="0s" />
            <Dot color="#f1c40f" $delay="0.2s" />
            <Dot color="#2ecc71" $delay="0.4s" />
            <Dot color="#9b59b6" $delay="0.6s" />
            <Dot color="#e67e22" $delay="0.8s" />
            <Dot color="#3498db" $delay="1s" />
        </LoaderContainer>
    );
};

export default Loading;