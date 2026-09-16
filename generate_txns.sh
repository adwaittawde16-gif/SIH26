#!/bin/bash
start_id=90012507
end_id=90012552
for (( i=start_id; i<=end_id; i++ )); do
  n=$(( i - start_id ))
  # compute step
  if [ $n -lt 10 ]; then
    step=1
    account_holder="Vikramaditya 'Bhai' Singhania"
    merchant_or_payee="Shree Balaji Finvest & Leaseholdings Pvt Ltd"
    amount=180000
  elif [ $n -lt 20 ]; then
    step=2
    n_step=$(( n - 10 ))
    account_holder="Sanjay 'CA' Verma"
    merchant_or_payee="Aura Gems & Bullion Exports Pvt Ltd"
    amount=850000
  elif [ $n -lt 28 ]; then
    step=3
    n_step=$(( n - 20 ))
    account_holder="Raju 'Chaiwala' Kanojia"
    # merchant_or_payee depends on which mule
    mule_index=$(( n_step % 8 ))
    case $mule_index in
      0) mule_name="Kunal 'Student' Sonawane" ;;
      1) mule_name="Deepak 'Delivery' Yadav" ;;
      2) mule_name="Sachin 'Rickshaw' Jadhav" ;;
      3) mule_name="Akash 'Carpenter' Shinde" ;;
      4) mule_name="Pooja 'Beautician' Rathod" ;;
      5) mule_name="Suraj 'Waiter' Kanojia" ;;
      6) mule_name="Vikas 'Painter' Nishad" ;;
      7) mule_name="Kavita 'Housewife' Gaikwad" ;;
    esac
    merchant_or_payee="$mule_name"
    amount=48500
  elif [ $n -lt 36 ]; then
    step=4
    n_step=$(( n - 28 ))
    # account_holder is the mule
    mule_index=$(( n_step % 8 ))
    case $mule_index in
      0) mule_name="Kunal 'Student' Sonawane" ;;
      1) mule_name="Deepak 'Delivery' Yadav" ;;
      2) mule_name="Sachin 'Rickshaw' Jadhav" ;;
      3) mule_name="Akash 'Carpenter' Shinde" ;;
      4) mule_name="Pooja 'Beautician' Rathod" ;;
      5) mule_name="Suraj 'Waiter' Kanojia" ;;
      6) mule_name="Vikas 'Painter' Nishad" ;;
      7) mule_name="Kavita 'Housewife' Gaikwad" ;;
    esac
    account_holder="$mule_name"
    merchant_or_payee="Mahesh 'Angadia' Jhaveri & Sons"
    amount=48500
  else
    step=5
    n_step=$(( n - 36 ))
    account_holder="Dharmesh 'Kolkata' Kothari"
    merchant_or_payee="Agricultural Farmhouse 10 Acres"
    amount=7500000
  fi

  # FIR number
  fir_num=$(( n + 1 ))
  fir=$(printf "%04d/2026" $fir_num)

  # timestamp
  base_seconds=$(( n * 100 )) # 100 seconds intervals
  hour=$(( base_seconds / 3600 ))
  remaining=$(( base_seconds % 3600 ))
  minute=$(( remaining / 60 ))
  second=$(( remaining % 60 ))
  day=$(( 1 + hour / 24 ))
  hour=$(( hour % 24 ))
  # format day and hour with leading zeros
  day_str=$(printf "%02d" $day)
  hour_str=$(printf "%02d" $hour)
  minute_str=$(printf "%02d" $minute)
  second_str=$(printf "%02d" $second)
  timestamp="2026-08-${day_str} ${hour_str}:${minute_str}:${second_str}"

  # payment mode: we'll cycle through a list
  payment_modes=("Wire Transfer" "UPI / QR Merchant" "Net Banking" "Cash")
  pm_index=$(( n % 4 ))
  payment_mode=${payment_modes[$pm_index]}

  # status: we'll cycle through SUCCESS, PENDING, FAILED
  statuses=("SUCCESS" "PENDING" "FAILED")
  s_index=$(( n % 3 ))
  status=${statuses[$s_index]}

  # transaction_id
  txn_id="TXN${i}"

  # output the row
  echo "${txn_id},${fir},${account_holder},${payment_mode},${amount},${timestamp},${merchant_or_payee},${status}"
done >> financial_transaction_records.csv
