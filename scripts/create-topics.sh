#! /bin/bash

# Function to validate if a string contains an integer
validate_integer() {
    re='^[0-9]+$'
    if ! [[ $1 =~ $re ]] ; then
        return 1
    fi
}

# Function to validate if a string contains host:port format
validate_host_port() {
    if [[ $1 =~ ^[a-zA-Z0-9.-]+:[0-9]+$ ]]; then
        return 0
    else
        return 1
    fi
}

[[ -z "$TOPICS" ]] && echo '$TOPICS is empty!' && exit 1
[[ -z "$ZOOKEEPER_HOST_PORT" ]] && echo '$ZOOKEEPER_HOST_PORT is empty!' && exit 1
[[ -z "$PARTITIONS_COUNT" ]] && echo '$PARTITIONS_COUNT is empty!' && exit 1
[[ -z "$REPLICATION_FACTOR" ]] && echo '$REPLICATION_FACTOR is empty!' && exit 1

# Split the string variable by commas into an array
IFS=',' read -ra TOPICS_ARRAY <<< "$TOPICS"
IFS=',' read -ra PARTITIONS_ARRAY <<< "$PARTITIONS_COUNT"
IFS=',' read -ra REPLICATION_ARRAY <<< "$REPLICATION_FACTOR"

topics_length=${#TOPICS_ARRAY[@]}
partitions_length=${#PARTITIONS_ARRAY[@]}
replication_length=${#REPLICATION_ARRAY[@]}

([ $topics_length -ne $partitions_length ] || [ $topics_length -ne $replication_length ]) && \
echo 'Diferent lenghts for $TOPICS, $REPLICATION_FACTOR, $PARTITIONS_COUNT' && \
exit 1

# Validate if ZOOKEEPER_HOST_PORT is in host:port format
if ! validate_host_port "$ZOOKEEPER_HOST_PORT"; then
    echo "Error: ZOOKEEPER_HOST_PORT is not in host:port format."
    exit 1
fi

n=0
retries=5

while [ $n -le $retries ]
do
  echo "Checking for existing brokers... ($(($n + 1)) of $retries)"
  zookeeper-shell $ZOOKEEPER_HOST_PORT ls /brokers/ids
  status=$?

  if [ $status -eq 0 ]
  then
    for ((i = 0; i < topics_length; i++)); do
      topic=${TOPICS_ARRAY[$i]}
      partitions=${PARTITIONS_ARRAY[$i]}
      replication=${REPLICATION_ARRAY[$i]}

      echo "Creating topic $topic if it doesn't exists..."
      kafka-topics --create --if-not-exists --zookeeper $ZOOKEEPER_HOST_PORT --topic $topic --partitions $partitions --replication-factor $replication && \
      echo "Topic \"$topic\" was created if it didn't existed!"

      [[ $? -eq 1 ]] && exit 1
    done

    echo "Done!" && exit 0
  else
    echo "No brokers found, retrying in 5 secs..."
    n=$(( n+1 ))
    sleep 5
  fi
done

echo "$retries failed attempts to create topic"
exit 1
