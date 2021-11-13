def Check_Keyboard(num: number):
    while num == 1:
        basic.show_number(read_keyboard())
        basic.pause(100)
        basic.clear_screen()
def MoveServo(servo_num: number, how_far: number, how_fast: number):
    ServoBit.move_servo(servo_num, how_far, how_fast)
    ServoBit.wait_servo(servo_num)
# There are 12 keys on this 12 keys on this keypad.. We need numbers for the '*' key and the '#' key.
# '*'  will be 10
# '#'  will be 12
# The "return" instruction will return the number inside the circle to the instruction that called the function.
#
def read_keyboard():
    # P0 col with zero at bottom
    pins.digital_write_pin(DigitalPin.P0, 1)
    # P0 col with zero at bottom
    pins.digital_write_pin(DigitalPin.P16, 0)
    # P0 col with zero at bottom
    pins.digital_write_pin(DigitalPin.P8, 0)
    # P1 row with the 4 on it
    # P1
    # P1
    if pins.digital_read_pin(DigitalPin.P1) == 1:
        return 5
    elif pins.digital_read_pin(DigitalPin.P2) == 1:
        return 2
    elif pins.digital_read_pin(DigitalPin.P12) == 1:
        return 8
    elif pins.digital_read_pin(DigitalPin.P13) == 1:
        return 0
    # P0 col with zero at bottom
    pins.digital_write_pin(DigitalPin.P0, 0)
    # set col 147 (pin 16) to one and read row 123 (pin  2) then row 456 (pin 1) then row 789 (pin 12)
    pins.digital_write_pin(DigitalPin.P16, 1)
    # P1 row with the 4 on it
    if pins.digital_read_pin(DigitalPin.P1) == 1:
        return 4
    elif pins.digital_read_pin(DigitalPin.P2) == 1:
        return 1
    elif pins.digital_read_pin(DigitalPin.P12) == 1:
        return 7
    elif pins.digital_read_pin(DigitalPin.P13) == 1:
        # same as * key
        return 10
    # set col 147 (pin 16) to one and read row 123 (pin  2) then row 456 (pin 1) then row 789 (pin 12)
    pins.digital_write_pin(DigitalPin.P16, 0)
    # P0 col with zero at bottom
    pins.digital_write_pin(DigitalPin.P8, 1)
    # P1 row with the 4 on it
    if pins.digital_read_pin(DigitalPin.P1) == 1:
        return 6
    elif pins.digital_read_pin(DigitalPin.P2) == 1:
        return 3
    elif pins.digital_read_pin(DigitalPin.P12) == 1:
        return 9
    elif pins.digital_read_pin(DigitalPin.P13) == 1:
        # same as # key
        return 11
    # P0 col with zero at bottom
    pins.digital_write_pin(DigitalPin.P8, 0)
    return 99
# the numbers on the right side of each of these needs to be the same as the slot or connector number on the micro-bit motor board.
# Example is the servo that rotates the arm has a variable called rotate-servo-num. It has the value 0. So the rotate servo needs to be plugged into the "0" pins on the motor board.
RotateNum = 0
UpDnNum = 1
InOutNum = 2
ClawNum = 3
speed_3 = 300
speed_2 = 200
speed_1 = 100
ServoBit.centre_servos()
# this is the key board number assigned to open claw. It can be changed of you want a different key to open claw.
# This is the same for all the  arm commands , like ROTATE CLOCKWISE.
# If you want to make ROTATE to be key 2 for example you would set ROTATE CLOCKWISE to 2.
ClawOpen = 5
ClawClose = 2
ROTATE_CW = 1
RotCCW = 4
armup = 6
armdown = 3
armin = 7
arm_out = 10
#
# Each time through the forever loop all 12 keys are checked for someone pressing a key.
# When the key is pressed the position of the servo is measured. In other words if the up/down arm key is pressed the position of the arm is measured  then 5 degrees is added to go down or subtracted to go up.

def on_forever():
    while read_keyboard() == ROTATE_CW:
        MoveServo(RotateNum, ServoBit.get_servo_actual(RotateNum) - 5, speed_1)
    while read_keyboard() == RotCCW:
        MoveServo(RotateNum, ServoBit.get_servo_actual(RotateNum) + 5, speed_1)
    while read_keyboard() == armdown:
        MoveServo(UpDnNum, ServoBit.get_servo_actual(UpDnNum) - 5, speed_1)
    while read_keyboard() == armup:
        MoveServo(UpDnNum, ServoBit.get_servo_actual(UpDnNum) + 5, speed_1)
    while read_keyboard() == armin:
        MoveServo(InOutNum, ServoBit.get_servo_actual(InOutNum) + 5, speed_1)
    while read_keyboard() == arm_out:
        MoveServo(InOutNum, ServoBit.get_servo_actual(InOutNum) - 5, speed_1)
    # claw close
    while read_keyboard() == ClawClose:
        MoveServo(ClawNum, ServoBit.get_servo_actual(ClawNum) - 5, speed_1)
    while read_keyboard() == ClawOpen:
        MoveServo(ClawNum, ServoBit.get_servo_actual(ClawNum) + 5, speed_1)
basic.forever(on_forever)
