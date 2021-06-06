import styled from 'styled-components'

export const Blur = styled.div`
    transition: 0.5s filter;
    will-change: filter;

    &[data-blur="true"] {
        filter: blur(3px);
    }
`
