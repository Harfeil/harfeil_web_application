<?php

namespace Tests\Unit;

use App\Models\User\User; // Adjust namespace if different
use PHPUnit\Framework\TestCase;

class UserTest extends TestCase
{
    /** @test */
    public function it_has_fillable_attributes()
    {
        $user = new User();

        $expected = [
            'name',
            'email',
            'password',
            'profile_picture',
            'role',
        ];

        $this->assertEquals($expected, $user->getFillable());
    }
}
