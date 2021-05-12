require 'test_helper'
class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: 'shadab', last_name: 'ali', email: 'Sam@gmail.com',
                     password: 'mahirali', role: 'administrator')
  end

  def test_instance_of_user
    assert_instance_of User, @user
  end

  def test_invalid_user_first_name
    @user.first_name = ''
    assert_not @user.valid?
    assert_equal ["First name can't be blank"], @user.errors.full_messages
  end

  def test_invalid_user_last_name
    @user.last_name = ''
    assert_not @user.valid?
    assert_equal ["Last name can't be blank"], @user.errors.full_messages
  end

  def test_invalid_user_email
    @user.email = ''
    assert_not @user.valid?
    assert_equal ["Email can't be blank", 'Email is invalid'], @user.errors.full_messages
  end

  def test_invalid_user_first_name_length
    @user.first_name = 'a' * 51
    assert_not @user.valid?
  end

  def test_invalid_user_last_name_length
    @user.last_name = 'a' * 51
    assert_not @user.valid?
  end

  def test_duplicate_user_email
    @user.save!
    test_user = @user.dup
    assert_not test_user.valid?
    assert_equal ['Email has already been taken'], test_user.errors.full_messages
  end

  def test_validation_user_email
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  def test_invalid_user_email_case
    test_user = User.new(first_name: 'shadab', last_name: 'ali', email: 'SAM@gmail.com',
                         password: 'mahirali')
    test_user.save!
    assert_not @user.valid?
  end

  def test_check_email_in_downcase
    test_email = @user.email.downcase!
    @user.email = test_email
    assert true, @user.valid?
  end

  def test_valid_user_role
    puts @user.role
    @user.role = 'administrator' || 'standard'
    assert true, @user.valid?
  end
end
