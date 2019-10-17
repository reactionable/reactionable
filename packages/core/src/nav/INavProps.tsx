import { match } from 'react-router-dom';
export interface INavProps<Match = any> {
    match: match<Match>;
}
