import * as React from 'react'
import {Session, HistoryFilter} from '../types'
import {Icon, $v} from 'graphcool-styles'
import * as cx from 'classnames'

interface Props {
  items: Session[]
  selectedItemIndex: number
  onItemSelect: (index: number) => void
  onItemStarToggled: (item: Session) => void
  selectedFilter: HistoryFilter
  searchTerm: string
}

const HistoryItems = (
  {
    items,
    onItemSelect,
    selectedItemIndex,
    onItemStarToggled,
    selectedFilter,
    searchTerm
  }: Props) => (
  <div className='history-items'>
    <style jsx>{`
      .history-items {
        @inherit: .overflowYScroll;
        max-height: calc(100vh - 121px);
      }
      .item {
        @inherit: .flex, .itemsCenter, .justifyBetween, .bb, .bBlack10, .pointer;
        padding: 25px 20px;
        &.active {
          background-color: rgba(0,0,0,.04);
        }
      }
      .operation, .star, .viewer, .left, .right {
        @inherit: .flex, .itemsCenter;
      }
      .operation {
        @inherit: .itemsCenter;
        margin-left: 20px;
      }
      .operation-text {
        @inherit: .fw3, .f20, .mr16;
      }
      .operation-icon {
        @inherit: .br2, .flex, .itemsCenter, .justifyCenter, .mr4, .fw7, .f12;
        height: 21px;
        width: 21px;
        &.subscription {
          color: rgb(164,3,111);
          background-color: rgba(164,3,111,.2);
        }
        &.query {
          color: rgb(42,126,211);
          background-color: rgba(42,126,211,.2);
        }
        &.mutation {
          color: rgb(241,143,1);
          background-color: rgb(241,143,1,.2);
        }
      }
      .endpoint {
        @inherit: .black30, .br2, .ph6, .pv4, .ttu, .fw6, .f12, .nowrap;
        background-color: rgba(0,0,0,.04);
      }
      .date {
        @inherit: .f14, .black50, .ml16;
      }
      .viewer {
        @inherit: .ml6;
      }
    `}</style>
    {items
      .filter(item => {
        return selectedFilter === 'STARRED' ? item.starred : true
          && (searchTerm && searchTerm.length > 0 ? item.query.toLowerCase().includes(searchTerm.toLowerCase()) : true)
      })
      .map((item, index) => (
      <div
        key={item.id}
        className={cx(
          'item',
          {
            'active': selectedItemIndex === index,
          }
        )}
        onClick={() => onItemSelect(index)}
      >
        <div className="left">
          <div
            className="star"
            onClick={() => onItemStarToggled(item)}
          >
            <Icon
              src={require('../assets/icons/star.svg')}
              color={
                item.starred ? 'rgb(221,171,0)' : $v.gray30
              }
              stroke={!item.starred}
              strokeWidth={0.5}
              width={25}
              height={25}
            />
          </div>
          <div className="operation">
            <div className="operation-text">
              {item.operationName || item.queryTypes.firstOperationName || 'New Session'}
            </div>
            {item.queryTypes.query && (
              <div className="operation-icon query">Q</div>
            )}
            {item.queryTypes.mutation && (
              <div className="operation-icon mutation">M</div>
            )}
            {item.queryTypes.subscription && (
              <div className="operation-icon subscription">S</div>
            )}
            <div className="viewer">
              {item.selectedViewer === 'EVERYONE' && (
                <Icon
                  src={require('graphcool-styles/icons/fill/world.svg')}
                  color={$v.gray30}
                  width={18}
                  height={18}
                />
              )}
              {item.selectedViewer === 'USER' && (
                <Icon
                  src={require('graphcool-styles/icons/fill/user.svg')}
                  color={$v.gray30}
                  width={18}
                  height={18}
                />
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="endpoint">
            {item.selectedEndpoint === 'SIMPLE' ? (
              'Simple API'
            ) : (
              'Relay API'
            )}
          </div>
          <div className="date">
            16/08/17
          </div>
        </div>
      </div>
    ))}
  </div>
)

export default HistoryItems