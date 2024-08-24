import { PiArrowsLeftRightLight } from 'react-icons/pi';
import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';
import TrainsSubPopup from './TrainsSubPopup';
import TrainsSubDatePopup from './TrainsSubDatePopup';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTrainsSortBySeats } from './useTrainsSortBySeats';
import TrainsSort from './TrainsSort';
import TrainsFilter from './TrainsFilter';
import Spinner from '../../utils/Spinner';
import TrainsInfo from './TrainsInfo';

const commonClass =
  'relative h-14 flex-col gap-2 w-[20%] rounded-md bg-[#ffffff1a] px-4 font-semibold uppercase text-left cursor-pointer items-center justify-center';

function TrainsSubTerminal() {
  const {
    isFromPopupOpen,
    handleFromClick,
    fromRef,
    from,
    to,
    showToast,
    handleClickOutside,
    isToPopupOpen,
    handleToClick,
    toRef,
    isTravelDatePopupOpen,
    handleTravelDate,
    dateRef,
    handleMainArrowButtonClick,
    weekday,
    day,
    month,
    longYear,
    year,
    setFrom,
    setTo,
    setDate,
    filter,
    sort,
  } = useTrainsMainContext();

  const navigate = useNavigate();

  const [filteredSortedTrains, setFilterdSortedTrains] = useState();

  const [searchParams] = useSearchParams();

  const sourceInfo = searchParams.get('source');
  const destinationInfo = searchParams.get('destination');
  const selectedDayInfo = searchParams.get('day');
  const selectedDateInfo = searchParams.get('date');

  const { trainsSortBySeats, isLoading } = useTrainsSortBySeats(
    sourceInfo,
    destinationInfo,
    selectedDayInfo.slice(0, 3)
  );

  const allTrains = trainsSortBySeats?.data?.trains;

  useEffect(() => {
    let condition = from === to;

    showToast(condition);

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      toast.dismiss();
    };
  }, [from, to, handleClickOutside, showToast]);

  useEffect(() => {
    setFrom(sourceInfo);
    setTo(destinationInfo);
    setDate(new Date(selectedDateInfo));
  }, [sourceInfo, destinationInfo, selectedDateInfo]);

  useEffect(() => {
    setFilterdSortedTrains(trainsSortBySeats?.data?.trains);
  }, [trainsSortBySeats]);

  useEffect(() => {
    let filterTrains = '';

    console.log(filter);

    const trainTypes = [
      'Superfast',
      'Rajdhani',
      'Express',
      'Shatabdi',
      'Duronto',
    ];

    const coachTypes = [
      'AC Chair Car -CC',
      '1st Class AC -1A',
      '2 Tier AC -2A',
      '3 Tier AC -3A',
      'AC three tier(economy)-3E',
      'Second Sitting -2S',
      'Executive Anubhuti -EA',
      'Sleeper Class -SL',
    ];

    for (let i = 0; i < filter.length; i++) {
      if (filter[i] === 'AC Chair Car -CC') {
        const matchingTrainTypes = filter.filter((type) =>
          trainTypes.includes(type)
        );
        if (matchingTrainTypes.length > 0) {
          for (let i = 0; i < matchingTrainTypes.length; i++) {
            if (matchingTrainTypes[i] === 'Superfast')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Superfast')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'CC'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Rajdhani')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Rajdhani')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'CC'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Express')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Express')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'CC'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Shatabdi')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Shatabdi')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'CC'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Duronto')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Duronto')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'CC'
                    )
                  ),
              ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) =>
              train.coaches.find((coach, index) => coach.coachType === 'CC')
            ),
          ];
      }

      if (filter[i] === '1st Class AC -1A') {
        const matchingTrainTypes = filter.filter((type) =>
          trainTypes.includes(type)
        );
        if (matchingTrainTypes.length > 0) {
          for (let i = 0; i < matchingTrainTypes.length; i++) {
            if (matchingTrainTypes[i] === 'Superfast')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Superfast')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '1A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Rajdhani')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Rajdhani')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '1A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Express')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Express')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '1A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Shatabdi')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Shatabdi')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '1A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Duronto')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Duronto')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '1A'
                    )
                  ),
              ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) =>
              train.coaches.find((coach, index) => coach.coachType === '1A')
            ),
          ];
      }

      if (filter[i] === '2 Tier AC -2A') {
        const matchingTrainTypes = filter.filter((type) =>
          trainTypes.includes(type)
        );
        if (matchingTrainTypes.length > 0) {
          for (let i = 0; i < matchingTrainTypes.length; i++) {
            if (matchingTrainTypes[i] === 'Superfast')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Superfast')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '2A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Rajdhani')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Rajdhani')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '2A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Express')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Express')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '2A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Shatabdi')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Shatabdi')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '2A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Duronto')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Duronto')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '2A'
                    )
                  ),
              ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) =>
              train.coaches.find((coach, index) => coach.coachType === '2A')
            ),
          ];
      }

      if (filter[i] === '3 Tier AC -3A') {
        const matchingTrainTypes = filter.filter((type) =>
          trainTypes.includes(type)
        );
        if (matchingTrainTypes.length > 0) {
          for (let i = 0; i < matchingTrainTypes.length; i++) {
            if (matchingTrainTypes[i] === 'Superfast')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Superfast')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '3A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Rajdhani')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Rajdhani')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '3A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Express')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Express')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '3A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Shatabdi')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Shatabdi')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '3A'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Duronto')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Duronto')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '3A'
                    )
                  ),
              ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) =>
              train.coaches.find((coach, index) => coach.coachType === '3A')
            ),
          ];
      }

      if (filter[i] === 'AC three tier(economy)-3E') {
        const matchingTrainTypes = filter.filter((type) =>
          trainTypes.includes(type)
        );
        if (matchingTrainTypes.length > 0) {
          for (let i = 0; i < matchingTrainTypes.length; i++) {
            if (matchingTrainTypes[i] === 'Superfast')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Superfast')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '3E'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Rajdhani')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Rajdhani')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '3E'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Express')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Express')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '3E'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Shatabdi')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Shatabdi')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '3E'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Duronto')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Duronto')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '3E'
                    )
                  ),
              ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) =>
              train.coaches.find((coach, index) => coach.coachType === '3E')
            ),
          ];
      }

      if (filter[i] === 'Second Sitting -2S') {
        const matchingTrainTypes = filter.filter((type) =>
          trainTypes.includes(type)
        );
        if (matchingTrainTypes.length > 0) {
          for (let i = 0; i < matchingTrainTypes.length; i++) {
            if (matchingTrainTypes[i] === 'Superfast')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Superfast')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '2S'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Rajdhani')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Rajdhani')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '2S'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Express')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Express')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '2S'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Shatabdi')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Shatabdi')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '2S'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Duronto')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Duronto')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === '2S'
                    )
                  ),
              ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) =>
              train.coaches.find((coach, index) => coach.coachType === '2S')
            ),
          ];
      }

      if (filter[i] === 'Executive Anubhuti -EA') {
        const matchingTrainTypes = filter.filter((type) =>
          trainTypes.includes(type)
        );
        if (matchingTrainTypes.length > 0) {
          for (let i = 0; i < matchingTrainTypes.length; i++) {
            if (matchingTrainTypes[i] === 'Superfast')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Superfast')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'EA'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Rajdhani')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Rajdhani')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'EA'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Express')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Express')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'EA'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Shatabdi')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Shatabdi')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'EA'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Duronto')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Duronto')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'EA'
                    )
                  ),
              ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) =>
              train.coaches.find((coach, index) => coach.coachType === 'EA')
            ),
          ];
      }

      if (filter[i] === 'Sleeper Class -SL') {
        const matchingTrainTypes = filter.filter((type) =>
          trainTypes.includes(type)
        );
        if (matchingTrainTypes.length > 0) {
          for (let i = 0; i < matchingTrainTypes.length; i++) {
            if (matchingTrainTypes[i] === 'Superfast')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Superfast')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'SL'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Rajdhani')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Rajdhani')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'SL'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Express')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Express')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'SL'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Shatabdi')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Shatabdi')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'SL'
                    )
                  ),
              ];

            if (matchingTrainTypes[i] === 'Duronto')
              filterTrains = [
                ...filterTrains,
                ...allTrains
                  ?.filter((train) => train.trainType === 'Duronto')
                  .filter((train) =>
                    train.coaches.find(
                      (coach, index) => coach.coachType === 'SL'
                    )
                  ),
              ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) =>
              train.coaches.find((coach, index) => coach.coachType === 'SL')
            ),
          ];
      }

      if (filter[i] === 'Departure after 6PM')
        filterTrains = [
          ...filterTrains,
          ...allTrains?.filter((train) => train.departureTime >= '18:00'),
        ];

      if (filter[i] === 'Arrival before 12PM')
        filterTrains = [
          ...filterTrains,
          ...allTrains?.filter((train) => train.arrivalTime <= '12:00'),
        ];

      if (filter[i] === 'Superfast') {
        const matchingCoachTypes = filter.filter((type) =>
          coachTypes.includes(type)
        );
        if (matchingCoachTypes.length > 0) {
          for (let i = 0; i < matchingCoachTypes.length; i++) {
            filterTrains = [
              ...filterTrains,
              ...allTrains
                ?.filter((train) =>
                  train.coaches.find(
                    (coach, index) =>
                      coach.coachType === matchingCoachTypes[i].split('-')[1]
                  )
                )
                .filter((train) => train.trainType === 'Superfast'),
            ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) => train.trainType === 'Superfast'),
          ];
      }

      if (filter[i] === 'Rajdhani') {
        const matchingCoachTypes = filter.filter((type) =>
          coachTypes.includes(type)
        );
        if (matchingCoachTypes.length > 0) {
          for (let i = 0; i < matchingCoachTypes.length; i++) {
            filterTrains = [
              ...filterTrains,
              ...allTrains
                ?.filter((train) =>
                  train.coaches.find(
                    (coach, index) =>
                      coach.coachType === matchingCoachTypes[i].split('-')[1]
                  )
                )
                .filter((train) => train.trainType === 'Rajdhani'),
            ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) => train.trainType === 'Rajdhani'),
          ];
      }

      if (filter[i] === 'Express') {
        const matchingCoachTypes = filter.filter((type) =>
          coachTypes.includes(type)
        );
        if (matchingCoachTypes.length > 0) {
          for (let i = 0; i < matchingCoachTypes.length; i++) {
            filterTrains = [
              ...filterTrains,
              ...allTrains
                ?.filter((train) =>
                  train.coaches.find(
                    (coach, index) =>
                      coach.coachType === matchingCoachTypes[i].split('-')[1]
                  )
                )
                .filter((train) => train.trainType === 'Express'),
            ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) => train.trainType === 'Express'),
          ];
      }

      if (filter[i] === 'Shatabdi') {
        const matchingCoachTypes = filter.filter((type) =>
          coachTypes.includes(type)
        );
        if (matchingCoachTypes.length > 0) {
          for (let i = 0; i < matchingCoachTypes.length; i++) {
            filterTrains = [
              ...filterTrains,
              ...allTrains
                ?.filter((train) =>
                  train.coaches.find(
                    (coach, index) =>
                      coach.coachType === matchingCoachTypes[i].split('-')[1]
                  )
                )
                .filter((train) => train.trainType === 'Shatabdi'),
            ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) => train.trainType === 'Shatabdi'),
          ];
      }

      if (filter[i] === 'Duronto') {
        const matchingCoachTypes = filter.filter((type) =>
          coachTypes.includes(type)
        );
        if (matchingCoachTypes.length > 0) {
          for (let i = 0; i < matchingCoachTypes.length; i++) {
            filterTrains = [
              ...filterTrains,
              ...allTrains
                ?.filter((train) =>
                  train.coaches.find(
                    (coach, index) =>
                      coach.coachType === matchingCoachTypes[i].split('-')[1]
                  )
                )
                .filter((train) => train.trainType === 'Duronto'),
            ];
          }
        } else
          filterTrains = [
            ...filterTrains,
            ...allTrains?.filter((train) => train.trainType === 'Duronto'),
          ];
      }
    }

    if (filter.length === 0) filterTrains = allTrains;

    filterTrains = [...new Set(filterTrains)];

    if (sort === 'Train Name')
      filterTrains = filterTrains.sort((a, b) =>
        a.trainName?.localeCompare(b.trainName)
      );

    if (sort === 'Departure')
      filterTrains = filterTrains.sort((a, b) =>
        a.departureTime?.localeCompare(b.departureTime)
      );

    if (sort === 'Travel Time')
      filterTrains = filterTrains.sort((a, b) => {
        const [ahours, aminutes] = a.travelDuration
          .split(' ')
          .map((time) => parseInt(time));
        const aTime = ahours * 60 + aminutes;
        const [bhours, bminutes] = b.travelDuration
          .split(' ')
          .map((time) => parseInt(time));
        const bTime = bhours * 60 + bminutes;
        console.log(aTime);
        console.log(bTime);
        return aTime - bTime;
      });

    if (sort === 'Arrival')
      filterTrains = filterTrains.sort((a, b) =>
        a.arrivalTime?.localeCompare(b.arrivalTime)
      );

    setFilterdSortedTrains(filterTrains);
  }, [filter, sort]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filter]);

  function handleSubSearch() {
    if (from !== to) {
      const searchParams = new URLSearchParams();
      searchParams.append('source', from);
      searchParams.append('destination', to);
      searchParams.append('day', weekday);
      searchParams.append('date', `${month}/${day}/${year}`);
      navigate({
        pathname: '/railways/search',
        search: `?${searchParams.toString()}`,
      });
    } else {
      toast.dismiss();
      toast.error(
        'Cannot proceed further until the source and destination are different. Please correct it.',
        { style: { border: '1px solid black' } }
      );
    }
  }

  return (
    <div className="pt-0">
      <div className="flex flex-col items-center justify-center gap-4 p-4 md:h-[300px] md:items-center md:flex-row bg-gradient-to-t from-[#15457b] to-[#051423] text-sm text-blue-400">
        <div
          className={commonClass + ' h-1/4 w-full'}
          onClick={handleFromClick}
          ref={fromRef}
        >
          <p>From</p>
          <p className="text-white">{from}</p>
          {isFromPopupOpen && <TrainsSubPopup destination="from" />}
        </div>
        <div onClick={handleMainArrowButtonClick} className="cursor-pointer">
          <PiArrowsLeftRightLight />
        </div>
        <div
          className={commonClass + ' h-1/4 w-full'}
          onClick={handleToClick}
          ref={toRef}
        >
          <p>To</p>
          <p className="text-white">{to}</p>
          {isToPopupOpen && <TrainsSubPopup destination="to" />}
        </div>
        <div
          className={commonClass + ' h-1/4 w-full'}
          onClick={handleTravelDate}
          ref={dateRef}
        >
          <p>Travel Date</p>
          <p className="text-white">
            {weekday.slice(0, 3)}, {month} {day}, {longYear}
          </p>
          {isTravelDatePopupOpen && <TrainsSubDatePopup />}
        </div>
        <button
          className="text-md m-[20px] flex md:h-[40px] md:w-[10%] items-center justify-center rounded-[35px] bg-gradient-to-r from-[#53b2fe] to-[#065af3] p-3 font-bold uppercase text-white h-fit w-full"
          onClick={handleSubSearch}
        >
          Search
        </button>
      </div>
      <TrainsSort />
      <div className="p-8 flex flex-col md:flex-row gap-8 md:justify-center md:px-16">
        <TrainsFilter trainsList={trainsSortBySeats?.data?.trains} />
        {isLoading && <Spinner />}
        {!isLoading && <TrainsInfo trainsList={filteredSortedTrains} />}
      </div>
    </div>
  );
}

export default TrainsSubTerminal;
