import gql from "graphql-tag";

export const QUERY_CTR_BY_DATE = gql`
  query getCTRByDay($inputFilter: GetCTRByDayFilterInput!) {
    getCTRByDay(filter: $inputFilter) {
      timestamp
      ctr
    }
  }
`;

export const QUERY_CTR_BY_TWO_DATES = gql`
  query getCTRByTwoDates($inputFilter: GetCTRByTwoDatesFilterInput!) {
    getCTRByTwoDates(filter: $inputFilter) {
      timestamp
      ctr
    }
  }
`;

export const QUERY_EVPM_BY_TWO_DATES = gql`
  query getEvPMByTwoDates($inputFilter: GetEvPMByTwoDatesFilterInput!) {
    getEvPMByTwoDates(filter: $inputFilter) {
      timestamp
      evpm
    }
  }
`;
